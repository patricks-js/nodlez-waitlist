import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type Props = {
  name: string;
};

const NodlezWaitlistWelcome = (props: Props) => {
  return (
    <Html lang="pt-br" dir="ltr">
      <Head />
      <Preview>
        Você está na lista de espera da Nodlez! Algo incrível está por vir.
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-lg">
            <Section className="mb-[32px] text-center">
              <Heading className="m-0 mb-[16px] font-bold text-[32px] text-gray-900">
                Bem-vindo(a) à Nodlez! 🎉
              </Heading>
              <Text className="m-0 text-[18px] text-gray-600">
                Você está oficialmente na nossa lista de espera!
              </Text>
            </Section>

            {/* Conteúdo Principal */}
            <Section className="mb-[32px]">
              <Text className="mb-[16px] text-[16px] text-gray-800 leading-[24px]">
                Olá {props.name || "👋"},
              </Text>

              <Text className="mb-[16px] text-[16px] text-gray-800 leading-[24px]">
                Obrigado(a) por entrar na lista de espera da Nodlez! Você será o
                primeiro a saber quando lançarmos, além de terá acesso
                antecipado antes de todos os outros.
              </Text>

              <Text className="mb-[24px] text-[16px] text-gray-800 leading-[24px]">
                Estamos construindo algo incrível e mal podemos esperar para
                compartilhar com você em breve!
              </Text>

              <Text className="text-[16px] text-gray-800 leading-[24px]">
                Nos falamos em breve!
                <br />
                Nodlez
              </Text>
            </Section>

            <Section className="border-gray-200 border-t pt-[24px] text-center">
              <Text className="m-0 text-[14px] text-gray-500">
                © 2025 Nodlez.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NodlezWaitlistWelcome;
