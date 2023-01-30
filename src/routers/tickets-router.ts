import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketByUser, getTicketTypes, postCreateTicket } from "@/controllers"; 

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types",getTicketTypes)
    .get("",getTicketByUser)
    .post("",postCreateTicket)

export { ticketsRouter }