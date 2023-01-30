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

export async function getTicketByUser (req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const ticket = await ticketsService.getTicketByUserId(userId);

        return res.status(httpStatus.OK).send(ticket);   
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function postCreateTicket (req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId }  = req.body;

    if (!ticketTypeId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
        const ticket = await ticketsService.postCreateTicketByUserId(userId, ticketTypeId);

        return res.status(httpStatus.CREATED).send(ticket);   
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
