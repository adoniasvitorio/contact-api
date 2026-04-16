import { Router } from "express";
import { MongoConnection } from "../../infra/db/mongo-client";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const db = MongoConnection.getDb();
    await db.command({ ping: 1 });

    res.json({
      status: "ok",
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default router;