import { IsOptional, Min, IsInt } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CustomerPaginationDto{
    @IsOptional()
    @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
    @ApiPropertyOptional({ example: 0, description: 'pagination' })
    @IsInt()
    @Min(0)
    skip:number;
    

    @IsOptional()
    @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
    @ApiPropertyOptional({ example: 5, description: 'limit pagination' })
    @IsInt()
    @Min(1)
    limit:number;
}