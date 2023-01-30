import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes (){
    const result = await ticketRepository.findManyTicketTypes();

    if (!result) {
        throw notFoundError();
      }

    return result;
}

async function getTicketByUserId (userId:number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!enrollment) {
        throw notFoundError();
    }

    const ticketWithTicketType = await ticketRepository.findOneUserTicketByEnrrolmentId(enrollment.id);

    if (!ticketWithTicketType) {
        throw notFoundError();
    }
    
    return ticketWithTicketType;
}

async function postCreateTicketByUserId (userId:number, ticketTypeId:number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
 
    if (!enrollment) {
        throw notFoundError();
    }
    const createTicket = {
        ticketTypeId:ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    }

    const ticketWithTicketType = await ticketRepository.createTicket(createTicket);

    if (!ticketWithTicketType) {
        throw notFoundError();
    }

    const ticket = await ticketRepository.findOneUserTicketByEnrrolmentId(enrollment.id);
    
    return ticket;
}

const ticketsService = {
    getTicketTypes,
    getTicketByUserId,
    postCreateTicketByUserId
}

export default ticketsService;