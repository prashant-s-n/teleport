import Nav from "../nav";
import WorkspaceLayout from "./workspace-layout";

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <> 
        <Nav/>
        <WorkspaceLayout>
          {children}
        </WorkspaceLayout>
        </>
    )
}