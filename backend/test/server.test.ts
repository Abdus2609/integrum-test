import supertest from "supertest";
import Prisma from "../src/db";
import { server } from "../src/server";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
  await Prisma.$disconnect();
});

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });

  it("should get all entries", async () => {
    const response = await supertest(server.server).get("/get/");
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get entry by id", async () => {
    const newEntry = await Prisma.entry.create({
      data: {
        title: "Get Entry By Id Test",
        description: "Example Description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    const response = await supertest(server.server).get(`/get/${newEntry.id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(newEntry.id);

    await Prisma.entry.delete({ where: { id: newEntry.id } });
  });

  it("should create an entry", async () => {
    const response = await supertest(server.server).post("/create/").send({
      title: "Create Entry Test",
      description: "This card will be created",
      created_at: new Date(),
      scheduled_date: new Date(),
    });

    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual("Create Entry Test");

    await Prisma.entry.delete({ where: { id: response.body.id } });
  });

  it("should delete an entry", async () => {
    const newEntry = await Prisma.entry.create({
      data: {
        title: "Delete Entry Test",
        description: "This card will be deleted",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    const response = await supertest(server.server).delete(`/delete/${newEntry.id}`);
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual("Deleted successfully");
  });

  it("should update an entry", async () => {
    const newEntry = await Prisma.entry.create({
      data: {
        title: "Update Entry Test",
        description: "This card will be updated",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    const response = await supertest(server.server).put(`/update/${newEntry.id}`).send({
      title: "Updated Entry",
      description: "This entry has been updated",
      created_at: new Date(),
      scheduled_date: new Date(),
    });

    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual("Updated successfully");

    await Prisma.entry.delete({ where: { id: newEntry.id } });
  });
});
