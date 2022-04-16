import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CommentForm } from "./components/comments/form"
import { ListComments } from "./components/comments/list"
import { Home } from "./components/home"
import { PostDetail } from "./components/home/postDetail"
import { LayoutApp } from "./components/layoutApp"
import { LayoutPanel } from "./components/layoutPanel"
import { Login } from "./components/login"
import { PostForm } from "./components/posts/form"
import { ListPosts } from "./components/posts/list"
import { Profile } from "./components/profile"
import { ProfilePassword } from "./components/profile/profilePassword"
import { ProtectedLayout } from "./components/protectedLayout"
import { Register } from "./components/register"
import { UserForm } from "./components/users/form"
import { ListUsers } from "./components/users/list"
import { AuthProvider } from "./context/providers/authProvider"

export const RoutesApp = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <LayoutApp children={<Home/>}/>
                    } />
                    <Route path='/login' element={
                        <Login/>
                    } />
                    <Route path='/register' element={
                        <Register/>
                    } />
                    <Route path='/profile' element={
                        <ProtectedLayout>
                            <LayoutPanel children={< Profile />} paths={['Perfil']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/profile/password' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<ProfilePassword />} paths={['Alterar Senha']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/users' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<ListUsers />} paths={['Usuários', 'Listar Usuários']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/users/create' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<UserForm />} paths={['Usuários', 'Criar Usuário']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/users/:id' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<UserForm />} paths={['Usuários', 'Atualizar Usuário']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/posts' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<ListPosts />} paths={['Publicações', 'Listar Publicações']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/posts/create' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<PostForm />} paths={['Publicações', 'Criar Publicação']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/posts/:id' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<PostForm />} paths={['Publicações', 'Atualizar Publicação']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/posts/:id/details' element={
                        <LayoutApp children={<PostDetail/>}/>
                    } />
                    <Route path='/comments' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<ListComments />} paths={['Comentários', 'Listar Comentários']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/comments/create' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<CommentForm />} paths={['Comentários', 'Criar Comentário']} />
                        </ProtectedLayout>
                    } />
                    <Route path='/comments/:id' element={
                        <ProtectedLayout>
                            <LayoutPanel children={<CommentForm />} paths={['Comentários', 'Atualizar Comentário']} />
                        </ProtectedLayout>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}