import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketByUser, getTicketTypes } from "@/controllers"; 

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types",getTicketTypes)
    .get("",getTicketByUser)

export { ticketsRouter }