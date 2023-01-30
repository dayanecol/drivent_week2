import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

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

const ticketsService = {
    getTicketTypes,
    getTicketByUserId,
}

export default ticketsService;