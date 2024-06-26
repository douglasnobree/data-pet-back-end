import { PrismaService } from "src/prisma/service";
import { prontuarioDTO } from "../DTO/prontuarioDTO";
import { HttpException, Injectable } from "@nestjs/common";
@Injectable()
export class crudService{
    constructor(private prisma: PrismaService) {}

    async createProntuario(body: prontuarioDTO){
        const {
            tutorId, 
            animalId,
            veterinarioId,
            doencas,
            vacinas,
            data_atualizacao,
            data_cadastro,
            data_exclusao,
        } = body;

        try {
            const prontuario = await this.prisma.prontuario.create({
                data: {
                    tutorId,
                    animalId,
                    veterinarioId,
                    doencas,
                    vacinas,
                    data_atualizacao,
                    data_cadastro,
                    data_exclusao,
                },
            });
            return prontuario;
    
        } catch (error) {
            console.error(error);
            throw new HttpException(
                {
                    message: 'Failed to create prontuario',
                    error: error,
                },
                400
            );
        }
    }

    async listProntuario(){
        try{
            return this.prisma.prontuario.findMany({
                include: {
                    tutor: true,
                    animal: true,
                    veterinario: true,
                },
            });
    
        }catch(error){
            console.error(error);
            return {message: 'Erro ao listar prontuarios', error: error};
        }
    }
    
    async deleteProntuario(id: string){
        try{
            const response = await this.prisma.prontuario.delete({
                where: {id: parseInt(id)},
            });
            return {message: 'Prontuario deletado com sucesso', response: response}
        }catch(error){
            console.error(error);
            return {message: 'Erro ao deletar prontuario', error: error};
        }
    }
    

}