import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";

async function getTicketTypes (){
    const result = await ticketRepository.findManyTicketTypes();

    if (!result) {
        throw notFoundError();
      }

    return result;
}

const ticketsService = {
    getTicketTypes,
}

export default ticketsService;