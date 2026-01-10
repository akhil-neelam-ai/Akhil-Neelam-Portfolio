import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    const resumePath = path.resolve(
      process.cwd(),
      "attached_assets",
      "Akhil_Neelam_Resume_1768006822069.pdf"
    );

    if (fs.existsSync(resumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Akhil_Neelam_Resume.pdf"
      );
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  });

  return httpServer;
}
