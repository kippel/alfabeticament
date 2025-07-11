import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AbcService } from './abc.service';

@Controller('abc')
export class AbcController {

    constructor(private abcService : AbcService ) {}

    @Get('abecedari')
    async abecedariUser(){

        const abc = await this.abcService.AbecedariBy();

        return { abecedari: abc}
    }

    @Get('abecedarilletres/:id')
    async abecedariLletres(@Param("id") id :number){
        // todo
        const abecedari_lletres = await this.abcService.abecedariLletresBy(id)
        return { abecedari : abecedari_lletres }
    }

    @Get('abecedlletres/:id')
    async abecedLletres(@Param("id") id :number){
        // todo
        const abecedari_lletres = await this.abcService.abecedariLletresBy(id)

        const abeced_lletres = await this.abcService.abecedLletresBy(id)
        return { abecedari : abecedari_lletres,   abeced:  abeced_lletres  }
    }


}
