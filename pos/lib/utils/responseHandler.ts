// utils/responseHandler.ts
export const successResponse = (res: any, data: any) => {
    return res.status(200).json({
      success: true,
      data,
    });
  };
  
  export const errorResponse = (res: any, message: string, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
  