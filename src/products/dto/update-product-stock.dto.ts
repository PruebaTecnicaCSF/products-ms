import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductStockDto{
    @IsString()
    productId: string;

    @IsNumber()
    newStock: number;

    @IsNumber()
    @IsOptional()
    lastCostPrice?: number;
}