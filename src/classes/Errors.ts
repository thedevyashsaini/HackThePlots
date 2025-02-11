export class Errors {
    static DBError(e: any) {
        return {
            message: "Database Error",
            error: true,
            data: e
        }
    }

    static NotFound(message: string) {
        return {
            message: message,
            error: true
        }
    }

    static Unsuccessful(message: string) {
        return {
            message: message,
            error: true
        }
    }
}