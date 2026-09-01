export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "SettingAttendance Backend API",
    version: "2.0.0",
    description: "Documentação completa das rotas da API REST do SettingAttendance. Inclui suporte a autenticação JWT Bearer.",
    contact: {
      name: "SettingAttendance Team"
    }
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor de Desenvolvimento Local"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          userID: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", example: "User" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Proposal: {
        type: "object",
        properties: {
          proposalID: { type: "string", format: "uuid" },
          address: { type: "string" },
          codOperator: { type: "string" },
          holder: { type: "string" },
          dependents: { type: "boolean", nullable: true },
          dateOfBirth: { type: "string", format: "date" },
          cpf: { type: "string" },
          identity: { type: "string", nullable: true },
          proposalNumber: { type: "string" },
          whatsapp: { type: "string" },
          zipCode: { type: "string" },
          numberResident: { type: "string" },
          UF: { type: "string", example: "SP" },
          contact: { type: "string" },
          email: { type: "string" },
          contractReadjustment: { type: "string", format: "date" },
          contractImplementation: { type: "string", format: "date" },
          billExpiration: { type: "string", format: "date" },
          contractPrice: { type: "number", format: "float" },
          lead: { type: "string" },
          plan: { type: "string" },
          typeOfContract: { type: "string" },
          office: { type: "string" },
          broker: { type: "string" },
          admFee: { type: "number", format: "float" },
          supervisor: { type: "string" },
          status: { type: "string", example: "PENDENTE" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Contact: {
        type: "object",
        properties: {
          contactID: { type: "string", format: "uuid" },
          name: { type: "string" },
          phone: { type: "string" },
          email: { type: "string", format: "email" },
          tags: { type: "array", items: { type: "string" } },
          notes: { type: "string" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Campaign: {
        type: "object",
        properties: {
          campaignID: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", example: "ACTIVE" },
          targetAudience: { type: "string" },
          sentCount: { type: "integer" },
          userName: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Message: {
        type: "object",
        properties: {
          messageID: { type: "string", format: "uuid" },
          senderPhone: { type: "string" },
          receiverPhone: { type: "string" },
          content: { type: "string" },
          status: { type: "string", example: "SENT" },
          timestamp: { type: "string", format: "date-time" }
        }
      },
      KanbanStep: {
        type: "object",
        properties: {
          stepId: { type: "string", example: "PROSPECTO" },
          label: { type: "string", example: "Prospecto" },
          color: { type: "string", example: "#E2773A" },
          badgeBg: { type: "string", example: "bg-primary/15" },
          badgeText: { type: "string", example: "text-primary" },
          badgeBorder: { type: "string", example: "border-primary/30" },
          stepOrder: { type: "integer", example: 1 },
          isDefault: { type: "boolean", example: true },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: { type: "integer", example: 412 },
              message: { type: "string" }
            }
          }
        }
      }
    }
  },
  paths: {
    "/createKanbanStep": {
      post: {
        tags: ["Esteira & Kanban Steps"],
        summary: "Criar nova etapa na esteira operacional",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["stepId", "label", "color"],
                properties: {
                  stepId: { type: "string", example: "AUDITORIA_DOCS" },
                  label: { type: "string", example: "Auditoria de Documentos" },
                  color: { type: "string", example: "#E2773A" },
                  badgeBg: { type: "string", example: "bg-primary/15" },
                  badgeText: { type: "string", example: "text-primary" },
                  badgeBorder: { type: "string", example: "border-primary/30" },
                  stepOrder: { type: "integer", example: 6 },
                  isDefault: { type: "boolean", example: false }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Etapa da esteira criada com sucesso" }
        }
      }
    },
    "/getKanbanStep": {
      post: {
        tags: ["Esteira & Kanban Steps"],
        summary: "Buscar etapa da esteira por ID/slug",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["stepId"],
                properties: { stepId: { type: "string", example: "PROSPECTO" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Etapa localizada" }
        }
      }
    },
    "/listKanbanStep": {
      post: {
        tags: ["Esteira & Kanban Steps"],
        summary: "Listar todas as etapas ativas da esteira operacional ordenadas",
        responses: {
          200: {
            description: "Lista de etapas da esteira",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    steps: { type: "array", items: { $ref: "#/components/schemas/KanbanStep" } },
                    total: { type: "integer" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/updateKanbanStep": {
      post: {
        tags: ["Esteira & Kanban Steps"],
        summary: "Atualizar etapa da esteira operacional",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["stepId", "label", "color"],
                properties: {
                  stepId: { type: "string", example: "PROSPECTO" },
                  label: { type: "string", example: "Prospecto Ativo" },
                  color: { type: "string", example: "#E2773A" },
                  badgeBg: { type: "string" },
                  badgeText: { type: "string" },
                  badgeBorder: { type: "string" },
                  stepOrder: { type: "integer" },
                  isDefault: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Etapa atualizada" }
        }
      }
    },
    "/deleteKanbanStep": {
      post: {
        tags: ["Esteira & Kanban Steps"],
        summary: "Desativar etapa da esteira operacional (soft delete)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["stepId"],
                properties: { stepId: { type: "string", example: "AUDITORIA_DOCS" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Etapa desativada" }
        }
      }
    },
    "/register": {
      post: {
        tags: ["Autenticação & Usuários"],
        summary: "Criar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Gabriel Silva" },
                  email: { type: "string", example: "gabriel@email.com" },
                  password: { type: "string", example: "Senha@123" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Usuário cadastrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    error: { type: "null" }
                  }
                }
              }
            }
          },
          400: {
            description: "Erro de validação ou e-mail já existente",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
          }
        }
      }
    },
    "/login": {
      post: {
        tags: ["Autenticação & Usuários"],
        summary: "Autenticar usuário e emitir token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "passwordHash"],
                properties: {
                  email: { type: "string", example: "gabriel@email.com" },
                  passwordHash: { type: "string", example: "Senha@123" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Autenticação realizada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "eyJhbGciOiJIUzI1Ni..." },
                    user: { $ref: "#/components/schemas/User" },
                    error: { type: "null" }
                  }
                }
              }
            }
          },
          400: {
            description: "Credenciais inválidas",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
          }
        }
      }
    },
    "/checkEmailExists": {
      post: {
        tags: ["Autenticação & Usuários"],
        summary: "Verificar se um e-mail já possui cadastro",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", example: "gabriel@email.com" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "E-mail cadastrado no sistema" },
          400: { description: "E-mail não encontrado no banco de dados" }
        }
      }
    },
    "/updateUser": {
      post: {
        tags: ["Autenticação & Usuários"],
        summary: "Atualizar dados do usuário",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userID"],
                properties: {
                  userID: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Dados atualizados com sucesso" }
        }
      }
    },
    "/deleteUser": {
      post: {
        tags: ["Autenticação & Usuários"],
        summary: "Deletar usuário por ID",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userID"],
                properties: {
                  userID: { type: "string", format: "uuid" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Usuário excluído com sucesso" }
        }
      }
    },
    "/createProposal": {
      post: {
        tags: ["Propostas"],
        summary: "Criar nova proposta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Proposal" }
            }
          }
        },
        responses: {
          200: { description: "Proposta criada com sucesso" }
        }
      }
    },
    "/getProposal": {
      post: {
        tags: ["Propostas"],
        summary: "Buscar proposta por ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["proposalID"],
                properties: { proposalID: { type: "string", format: "uuid" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Proposta localizada" }
        }
      }
    },
    "/listProposal": {
      post: {
        tags: ["Propostas"],
        summary: "Listar propostas ativas com paginação e filtros",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: { type: "integer", example: 1 },
                  limit: { type: "integer", example: 10 },
                  status: { type: "string" },
                  holder: { type: "string" },
                  cpf: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Lista de propostas ativas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    proposals: { type: "array", items: { $ref: "#/components/schemas/Proposal" } },
                    total: { type: "integer" },
                    page: { type: "integer" },
                    limit: { type: "integer" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/updatedProposal": {
      post: {
        tags: ["Propostas"],
        summary: "Atualizar proposta existente",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Proposal" }
            }
          }
        },
        responses: {
          200: { description: "Proposta atualizada" }
        }
      }
    },
    "/deleteProposal": {
      post: {
        tags: ["Propostas"],
        summary: "Soft delete de proposta (isActive = false)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["proposalID"],
                properties: { proposalID: { type: "string", format: "uuid" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Proposta desativada" }
        }
      }
    },
    "/createContact": {
      post: {
        tags: ["Contatos"],
        summary: "Criar novo contato",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Contact" }
            }
          }
        },
        responses: {
          200: { description: "Contato criado" }
        }
      }
    },
    "/getContact": {
      post: {
        tags: ["Contatos"],
        summary: "Buscar contato por ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["contactID"],
                properties: { contactID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Contato localizado" }
        }
      }
    },
    "/updateContact": {
      post: {
        tags: ["Contatos"],
        summary: "Atualizar contato",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Contact" } }
          }
        },
        responses: {
          200: { description: "Contato atualizado" }
        }
      }
    },
    "/deleteContact": {
      post: {
        tags: ["Contatos"],
        summary: "Remover contato",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["contactID"],
                properties: { contactID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Contato removido" }
        }
      }
    },
    "/createCampaign": {
      post: {
        tags: ["Campanhas"],
        summary: "Criar campanha de disparo",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Campaign" } }
          }
        },
        responses: {
          200: { description: "Campanha criada" }
        }
      }
    },
    "/getCampaign": {
      post: {
        tags: ["Campanhas"],
        summary: "Buscar campanha por ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["campaignID"],
                properties: { campaignID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Campanha localizada" }
        }
      }
    },
    "/updateCampaign": {
      post: {
        tags: ["Campanhas"],
        summary: "Atualizar campanha",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Campaign" } }
          }
        },
        responses: {
          200: { description: "Campanha atualizada" }
        }
      }
    },
    "/deleteCampaign": {
      post: {
        tags: ["Campanhas"],
        summary: "Deletar campanha",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["campaignID"],
                properties: { campaignID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Campanha excluída" }
        }
      }
    },
    "/exportCampaignCSV": {
      post: {
        tags: ["Campanhas"],
        summary: "Exportar relatório de campanha em CSV",
        responses: {
          200: { description: "Arquivo CSV para download" }
        }
      }
    },
    "/exportCampaignPDF": {
      post: {
        tags: ["Campanhas"],
        summary: "Exportar relatório de campanha em PDF",
        responses: {
          200: { description: "Arquivo PDF gerado" }
        }
      }
    },
    "/createMessage": {
      post: {
        tags: ["Mensagens & WhatsApp"],
        summary: "Enviar nova mensagem",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Message" } }
          }
        },
        responses: {
          200: { description: "Mensagem criada" }
        }
      }
    },
    "/getMessage": {
      post: {
        tags: ["Mensagens & WhatsApp"],
        summary: "Buscar mensagem por ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["messageID"],
                properties: { messageID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Mensagem localizada" }
        }
      }
    },
    "/updateMessage": {
      post: {
        tags: ["Mensagens & WhatsApp"],
        summary: "Atualizar status da mensagem",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Message" } }
          }
        },
        responses: {
          200: { description: "Mensagem atualizada" }
        }
      }
    },
    "/deleteMessage": {
      post: {
        tags: ["Mensagens & WhatsApp"],
        summary: "Deletar mensagem",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["messageID"],
                properties: { messageID: { type: "string" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Mensagem excluída" }
        }
      }
    },
    "/startSessionWhatsApp": {
      post: {
        tags: ["Mensagens & WhatsApp"],
        summary: "Iniciar ou obter QR Code da sessão WhatsApp",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sessionName: { type: "string", example: "default" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Sessão iniciada" }
        }
      }
    },
    "/getPermissions": {
      post: {
        tags: ["Gestão de Permissões (Root)"],
        summary: "Buscar permissões de um usuário por ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userID"],
                properties: { userID: { type: "string", format: "uuid" } }
              }
            }
          }
        },
        responses: {
          200: { description: "Lista de permissões do usuário" }
        }
      }
    },
    "/updatePermissions": {
      post: {
        tags: ["Gestão de Permissões (Root)"],
        summary: "Atualizar matriz de permissões de um usuário (Perfil Root)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["requesterID", "targetUserID", "permissions"],
                properties: {
                  requesterID: { type: "string", format: "uuid" },
                  targetUserID: { type: "string", format: "uuid" },
                  permissions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        module: { type: "string" },
                        canRead: { type: "boolean" },
                        canWrite: { type: "boolean" },
                        canDelete: { type: "boolean" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Permissões atualizadas com sucesso" }
        }
      }
    },
    "/listUsers": {
      post: {
        tags: ["Gestão de Permissões (Root)"],
        summary: "Listar usuários cadastrados para gestão de acessos",
        responses: {
          200: { description: "Lista de usuários cadastrados" }
        }
      }
    },
    "/createStepProspecto": {
      post: {
        tags: ["Transições de Esteira (stepsPropscto)"],
        summary: "Registrar transição de fase de proposta com motivo em texto rico",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["proposalId", "toStep", "description"],
                properties: {
                  proposalId: { type: "string", example: "PROP-#925" },
                  fromStep: { type: "string", example: "PROSPECTO" },
                  toStep: { type: "string", example: "EM_CONTATO" },
                  description: { type: "string", example: "<p>Cliente contatado via WhatsApp e confirmou interesse no plano Odonto.</p>" },
                  history: { type: "object" },
                  userId: { type: "string", example: "user-123" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Registro de transição criado com sucesso" },
          400: { description: "Erro de validação ou pré-condição" }
        }
      }
    },
    "/getStepProspecto": {
      post: {
        tags: ["Transições de Esteira (stepsPropscto)"],
        summary: "Buscar registro individual de transição por UUID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["uuid"],
                properties: {
                  uuid: { type: "string", format: "uuid" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Registro encontrado" },
          400: { description: "Registro não encontrado ou UUID inválido" }
        }
      }
    },
    "/listStepProspecto": {
      post: {
        tags: ["Transições de Esteira (stepsPropscto)"],
        summary: "Listar histórico de transições de esteira (opcionalmente por proposalId)",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  proposalId: { type: "string", example: "PROP-#925" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Lista de transições" }
        }
      }
    },
    "/updateStepProspecto": {
      post: {
        tags: ["Transições de Esteira (stepsPropscto)"],
        summary: "Atualizar justificativa ou dados da transição",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["uuid"],
                properties: {
                  uuid: { type: "string", format: "uuid" },
                  description: { type: "string" },
                  history: { type: "object" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Transição atualizada com sucesso" },
          400: { description: "Erro de validação" }
        }
      }
    },
    "/deleteStepProspecto": {
      post: {
        tags: ["Transições de Esteira (stepsPropscto)"],
        summary: "Excluir registro de transição por UUID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["uuid"],
                properties: {
                  uuid: { type: "string", format: "uuid" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Registro excluído com sucesso" },
          400: { description: "Erro de validação" }
        }
      }
    }
  }
};
