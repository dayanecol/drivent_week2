import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketTypes (req: AuthenticatedRequest, res: Response) {
    try {
        const ticketTypes = await ticketsService.getTicketTypes();

        return res.status(httpStatus.OK).send(ticketTypes);   
    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}