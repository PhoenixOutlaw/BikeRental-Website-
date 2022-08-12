import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard, Roles } from 'src/guards/role.guard';
import { BikesService } from '../services/bikes.service';

@Controller('bike')
@UseGuards(AuthGuard)
export class BikesController {
    constructor(private service: BikesService){}

    @Get()
    getallbikes(){
        return this.service.getallbike();
    }

    @Get("/:id")
    getbike(@Param("id") id:string , @Body() data: any){
        return this.service.getbike(id,data.jwt.role);
    }

    @Post()
    @Roles('admin')
    @UseGuards(RoleGuard)
    create(@Body() data : any ){
        return this.service.createnew(data.data);
    }
    @Patch("/:id")
    @Roles('admin')
    @UseGuards(RoleGuard)
    update(@Param("id") id:string , @Body() data:any){
        return this.service.update(id, data.data);
    }
    @Delete("/:id")
    @Roles('admin')
    @UseGuards(RoleGuard)
    delete(@Param("id") id:string ){
        return this.service.delete(id)
    }
}
