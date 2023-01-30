import { prisma } from "@/config"; 
import { Ticket } from "@prisma/client";

async function findManyTicketTypes() {
    return prisma.ticketType.findMany();
}

async function findOneUserTicketByEnrrolmentId(enrollmentId:number){
    return prisma.ticket.findFirst({
        where:{
            enrollmentId:enrollmentId,
        },
        include:{
            TicketType:true,
        }
    })
}

async function createTicket(ticket: CreateTicketParams) {
    return prisma.ticket.create({
        data:{ 
            ...ticket,
        }
    });
}
  
export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
  
const ticketRepository = {
    findManyTicketTypes,
    findOneUserTicketByEnrrolmentId,
    createTicket

};

export default ticketRepository;
