import { Button, Card, Center, Container } from "@mantine/core"
import { IconBrandGoogle } from "@tabler/icons"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers, callbackUrl }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Center className="w-screen h-screen">
            <Card shadow={"sm"} withBorder>
                <div className="p-8">
                    <h1 className="font-semibold mb-8">Login</h1>
                    {Object.values(providers!).map((provider) => (
                        <div key={provider.name}>
                            <Button onClick={() => signIn(provider.id, { callbackUrl })} leftIcon={<IconBrandGoogle />}>
                                Sign in with {provider.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </Center>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const providers = await getProviders()
    const callbackUrl = context.query.callbackUrl as string

    return {
        props: { providers, callbackUrl },
    }
}