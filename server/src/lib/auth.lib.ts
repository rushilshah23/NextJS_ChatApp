import { AccessToken, AccessTokenPayload, RefreshToken, RefreshTokenPayload, TokenExpiration } from "@/types/Payloads.interface";
import UserInterface from "@/types/User.interface";
import jwt from "jsonwebtoken";
import { ENV_VAR as env_config } from "@/config/env.config";
import { Response } from "express";
import { Cookies } from "@/types/Cookies.enum";
import { accessTokenCookieOptions, defaultCookieOptions, refreshTokenCookieOptions } from "@/config/cookie.config";
import UserSchema from "@/models/UserSchema"
import bcrypt from "bcrypt";


class Auth {

  public authenticateHelper = async (accessToken?: string, refreshToken?: string) => {
    console.log("Authenticated started")
    if (!accessToken || !refreshToken) {
      return null;
    }

    const accessTokenPayload = this.verifyAccessToken(accessToken);
    if (accessTokenPayload) {
      return accessTokenPayload

    }
    if (!accessTokenPayload) {
      const refreshTokenPayload = this.verifyRefreshToken(refreshToken)
      console.log(refreshTokenPayload)
      if (refreshTokenPayload) {
        const user = {
          authentication: { tokenVersion: refreshTokenPayload.versionId },
          emailId: refreshTokenPayload.emailId,
          userId: refreshTokenPayload.userId
        }
        return user;

      } else {
        return null;
      }
    }


  }



  public verifyRefreshToken(token: string) {
    try {
      // FIND THE USER OF THE REFRESH TOKEN FROM DATABASE AND WETHER IT MATCHES WIT 
      return jwt.verify(token, env_config.JWT_REFRESH_TOKEN_SECRET) as RefreshToken


    } catch (error) {
      console.log(error)
    }
  }


  public verifyAccessToken = (token: string) => {
    try {
      return jwt.verify(token, env_config.JWT_ACCESS_TOKEN_SECRET) as AccessToken
    } catch (error) {
      console.log(error)
    }
  }


  public signAccessToken = async (accessTokenPayload: AccessTokenPayload) => {
    return jwt.sign(accessTokenPayload, env_config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: TokenExpiration.Access })
  }

  public signRefreshToken = async (refreshTokenPayload: RefreshTokenPayload) => {
    return jwt.sign(refreshTokenPayload, env_config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: TokenExpiration.Refresh })
  }

  public createRefreshAccessTokens = async (user: UserInterface) => {

    const accessPayload: AccessTokenPayload = { userId: user.userId, emailId: user.emailId }
    const refreshPayload: RefreshTokenPayload = { userId: user.userId, emailId: user.emailId, versionId: user.authentication.tokenVersion }

    const accessToken = await this.signAccessToken(accessPayload)
    const refreshToken = refreshPayload && await this.signRefreshToken(refreshPayload)
    return { accessToken, refreshToken }
  }

  public setCookie = async (res: Response, accessToken: string, refreshToken?: string) => {
    res.cookie(Cookies.ACCESSTOKEN, accessToken, accessTokenCookieOptions);
    refreshToken && res.cookie(Cookies.REFRESHTOKEN, refreshToken, refreshTokenCookieOptions);

  }
  public clearCookie = async (res: Response) => {
    res.cookie(Cookies.ACCESSTOKEN, '', { ...defaultCookieOptions, maxAge: 0 })
    res.cookie(Cookies.REFRESHTOKEN, '', { ...defaultCookieOptions, maxAge: 0 })
  }

  public getUsersByEmailId = (emailId: string) => {
    const user = UserSchema.findOne({ emailId: emailId });
    return user;
  }

  public createLocalUser = async (emailid: string, password: string) => {
    const SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
      UserSchema.create({ emailId: emailid, authentication: { password: hashedPassword, tokenVersion: 0 } });
    } catch (error: any) {
      throw Error(error!)
    }
  }



}

export { Auth }