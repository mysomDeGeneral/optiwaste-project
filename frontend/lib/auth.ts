import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    role: string;
    isCollector: boolean;
}