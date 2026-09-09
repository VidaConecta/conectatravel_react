import type { Icon } from '@phosphor-icons/react'
import {
  ClockIcon,
  FileTextIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserPlusIcon,
  WhatsappLogoIcon
} from '@phosphor-icons/react'

const NUMERO_WHATSAPP = '5511964760423'
const MENSAGEM_WHATSAPP = 'Olá! Vim pelo site da ConectaTravel e preciso de ajuda.'

export const LINK_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`

export interface LinkInterno {
  tipo: 'interno'
  rota: string
  texto: string
}

export interface LinkExterno {
  tipo: 'externo'
  href: string
  texto: string
}

export interface Topico {
  id: string
  rotulo: string
  pergunta: string
  resposta: string
  icone: Icon
  link?: LinkInterno | LinkExterno
}

export const TOPICOS: Topico[] = [
  {
    id: 'seguro-viagem',
    rotulo: 'Seguro viagem',
    pergunta: 'Como funciona o seguro viagem ConectaTravel?',
    resposta:
      'O ConectaTravel centraliza o cadastro de clientes e apólices de seguro viagem em um só lugar, com acompanhamento de status (ativa, finalizada etc). Veja a introdução do projeto para entender melhor a proposta.',
    icone: ShieldCheckIcon,
    link: {
      tipo: 'interno',
      rota: '/introducao',
      texto: 'Ver introdução'
    }
  },
  {
    id: 'cadastrar-apolice',
    rotulo: 'Nova apólice',
    pergunta: 'Como cadastro uma nova apólice?',
    resposta:
      'Vá até "Apólices" e clique em "Nova Apólice". Preencha os dados da viagem e o cliente vinculado — o prêmio é calculado automaticamente.',
    icone: FileTextIcon,
    link: {
      tipo: 'interno',
      rota: '/cadastrarapolice',
      texto: 'Cadastrar apólice'
    }
  },
  {
    id: 'cadastrar-cliente',
    rotulo: 'Novo cliente',
    pergunta: 'Como cadastro um cliente?',
    resposta:
      'Na página "Clientes", clique em "Cadastrar Cliente" e preencha nome, CPF/CNPJ, data de nascimento, e-mail e empresa.',
    icone: UserPlusIcon,
    link: {
      tipo: 'interno',
      rota: '/clientes/cadastrar',
      texto: 'Cadastrar cliente'
    }
  },
  {
    id: 'editar-perfil',
    rotulo: 'Meu perfil',
    pergunta: 'Como edito meus dados de perfil?',
    resposta:
      'Acesse "Perfil" no menu e clique em "Editar perfil". Por segurança, é preciso informar uma senha para confirmar as alterações.',
    icone: UserCircleIcon,
    link: {
      tipo: 'interno',
      rota: '/perfil',
      texto: 'Ir para o perfil'
    }
  },
  {
    id: 'pagina-travada',
    rotulo: 'Carregando muito?',
    pergunta: 'A página ficou travada em "Carregando..."',
    resposta:
      'Isso pode acontecer na primeira requisição depois de um tempo sem uso: o servidor pode levar até 1 minuto para responder. Aguarde um pouco — se persistir, recarregue a página.',
    icone: ClockIcon
  },
  {
    id: 'falar-time',
    rotulo: 'Falar com o time',
    pergunta: 'Preciso falar com alguém do time',
    resposta: 'Fale com a gente direto pelo WhatsApp que já vamos te ajudar.',
    icone: WhatsappLogoIcon,
    link: {
      tipo: 'externo',
      href: LINK_WHATSAPP,
      texto: 'Abrir WhatsApp'
    }
  }
]
