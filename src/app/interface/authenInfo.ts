export interface AuthenInfo {
    ctx: {
        domain_id: string,
        access_token: string,
        token_agent: string,
        part: string
    };
    type: string;
    username: string;
    password: string;
    otp: number;
    request_id: string;
    type_mfa: string;
    user_type: string;
    domain: string;
}