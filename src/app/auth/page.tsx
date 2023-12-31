import { SignInForm, SignUpForm } from "@/components/forms/AuthForms";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default async function Auth() {
  return (
    <main className="flex min-h-screen justify-center">
      <section className="container p-2">
        <h1 className="text-center text-[48px] text-blue-700">NURE AUTO</h1>
        <div className="w-[500px] mx-auto mt-2">
          <Tabs defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Login</TabsTrigger>
              <TabsTrigger value="sign-up">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <Card>
                <CardContent className="p-4">
                  <SignInForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sign-up">
              <Card>
                <CardContent className="p-4">
                  <SignUpForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
