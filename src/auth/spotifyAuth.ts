const clientId = "client-id";

export async function redirectToAuthCodeFlow(clientId: string){
    // TODO: Redirect to Spotify authorization page
}

export async function getAccessToken(clientId: string, code: string){
    // TODO: Get acess token for code
}

export async function fetchProfile(token: string): Promise<any>{
    // TODO: call web api
}

export async function populateUI(profile: any){
    // TODO: Update UI w/profile data
}