export interface IRefund {

    oredrId: number;
    reason: string;
    status: 0;
    file: {
        fieldName: string,
        filename: string,
        fileExtension: string,
        fileData: string
    }
}