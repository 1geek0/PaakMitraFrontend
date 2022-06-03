import axios from "axios";
import {LoginResponse} from "../types/login.response";

export default class PaakMitraService {
  private static instance: PaakMitraService
  private BASE_URL = 'https://paakmitra-jtaekyvloa-el.a.run.app'
  
  private mAxios = axios.create({baseURL: 'https://paakmitra-jtaekyvloa-el.a.run.app'})
  
  private accessToken = ""
  
  private constructor() {
  }
  
  public static getInstance(): PaakMitraService {
    if (!PaakMitraService.instance)
      PaakMitraService.instance = new PaakMitraService()
    return PaakMitraService.instance
  }
  
  public async login(email: string, password: string) {
    try {
      const loginCall = await this.mAxios.post<LoginResponse>(`${this.BASE_URL}/auth/signin`, {
        email,
        password
      })
      this.accessToken = loginCall.data.accessToken
      return this.accessToken
    } catch (e) {
      console.error(e)
    }
  }
  
  public async register(email: string, password: string, name: string) {
    try {
      const registetCall = await this.mAxios.post<LoginResponse>(`${this.BASE_URL}/auth/register`, {
        email, password, name
      })
      this.accessToken = registetCall.data.accessToken
      return this.accessToken
    } catch (e) {
      console.error(e)
    }
  }
  
  public async findRecipes(query: string, token: string) {
    try {
      const recipeCall = await this.mAxios.get(`${this.BASE_URL}/recipes`, {params: {q: query}, headers: {
        'Authorization': `Bearer ${token}`
        }})
      console.log(recipeCall)
      return recipeCall.data
    } catch (e) {
      console.error(e)
    }
  }
  
}