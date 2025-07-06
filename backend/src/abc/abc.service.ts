import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AbcService {
    constructor(private prisma: PrismaService) {}

    async AbecedariBy(){
        return await this.prisma.abecedari_abc.findMany();
    }

    async abecedariLletresBy(id: number){
        
        return await this.prisma.abecedari_abc_lletres.findMany({
            where: {
                abecedariId: id,
            },
        });
        
    }
}
