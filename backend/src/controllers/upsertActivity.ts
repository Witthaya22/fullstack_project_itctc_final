import { RequestHandler } from "express";
import prisma from "../prisma";

const upsertActivity: RequestHandler = async (req, res) => {
  const { title, description, images, score } = req.body;

  // Basic validation
  if (!title || !description || !Array.isArray(images) || typeof score !== "number") {
    return res.status(400).send({
      message: "ข้อมูลไม่ถูกต้อง",
    });
  }

  const payload = {
    title,
    description,
    images,
    score,
  };

  try {
    await prisma.activity.upsert({
      where: {
        id: req.query.id ? +req.query.id : -1,
      },
      create: payload,
      update: payload,
    });

    res.status(201).send({
      message: "อัปเดตกิจกรรมสำเร็จ",
    });
  } catch (error) {
    console.error("Error upserting activity:", error);
    res.status(500).send({
      message: "เกิดข้อผิดพลาดในการอัปเดตกิจกรรม",
    });
  }
};

export default upsertActivity;
