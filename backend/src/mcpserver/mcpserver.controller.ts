import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Req,
} from "@nestjs/common";
import { McpServerService } from "./mcpserver.service";
import { K8sResponse } from "./interfaces/k8s.interface";
import { Request } from "express";

@Controller("mcpserver")
export class McpServerController {
  constructor(private readonly McpServerService: McpServerService) {}
  @Get(":name")
  getMcpServerByName(@Param("name") name: string): Promise<any> {
    return this.McpServerService.getMcpServerByName(name);
  }
  @Get()
  getMcpServerList(@Req() req: Request): Promise<K8sResponse> {
    // any query params
    const queryParams = req.query;
    return this.McpServerService.getMcpServerList(queryParams);
  }

  @Post()
  createMcpServer(
    @Body("name") name: string,
    @Body("image") image: string,
    @Body("envs") envs: object = {},
    @Body("labels") labels: object = {},
    @Body("annotations") annotations: object = {}
  ): Promise<any> {
    return this.McpServerService.createMcpServer(
      name,
      image,
      envs,
      labels,
      annotations
    );
  }

  @Delete(":name")
  deleteMcpServer(@Param("name") name: string): Promise<any> {
    return this.McpServerService.deleteMcpServer(name);
  }
}
