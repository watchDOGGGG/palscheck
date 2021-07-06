import {createGlobalStyle} from 'styled-components'
export const lightTheme = {
    body:'#ececff30',
    fontColor:'#090b0c',
    icons: '#757575',
    newsfeed:'#fff',
    lightFont:'#999999',
    grayFont:'#95a8b5',
    commentColor: '##fff',
    menuColor: '#fff',
    notifyBackground:'#4499ccbd'
}
export const darkTheme = {
    body:'#050606',
    fontColor:'#e4e6eb',
    icons: '#757575',
    newsfeed:'#0b0c0c',
    grayFont: '#95a8b5',
    commentColor: '#0b0c0c',
    menuColor: '#252525',
    notifyBackground:'#4aa0d442'
}

export const GlobalStyles = createGlobalStyle`

body{
    background-color: ${props=>props.theme.body}
}

a{
    color: ${props=>props.theme.fontColor}
}
.layout-header{
    background-color: ${props=>props.theme.body}
}
.feed-c-i{
    color: ${props=>props.theme.icons}
}
.newfeed--3-art{
    background-color: ${props=>props.theme.newsfeed}
}
.feedname{
    color: ${props=>props.theme.fontColor}
}
.textarea_13l{
    color: ${props=>props.theme.fontColor}
}
.ant-tabs{
    color: ${props=>props.theme.fontColor}
}
.ant-comment-content-author-name > * {
    color: ${props=>props.theme.fontColor}
}
.ant-modal-content{
    background-color: ${props=>props.theme.body}
}
.ant-modal-header{
    background-color: ${props=>props.theme.body}
}
.ant-modal-header{
    color: ${props=>props.theme.fontColor}
}
.editing_panel{
    background-color: ${props=>props.theme.body}
}
.f-name{
    color: ${props=>props.theme.lightFont}
}
.f-name2{
    color: ${props=>props.theme.grayFont}
}
.chat-box{
    background-color: ${props=>props.theme.body}
}
.textarea_13l{
    color: ${props=>props.theme.fontColor}
}
h1,h2,h3,h4.h5,h6{
    color: ${props=>props.theme.lightFont}
}
.commentBody{
    background-color: ${props=>props.theme.commentColor}
}
.menuColor{
    background-color: ${props=>props.theme.menuColor}
}
.notifyBackground{
    background-color: ${props=>props.theme.notifyBackground}
}
`