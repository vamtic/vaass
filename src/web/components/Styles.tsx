import { generate } from '../routes/stylesheet.css.ts';

export const Styles = async () => <style>{(await generate()).css}</style>;
export const StylesLink = () => <link rel='stylesheet' type='text/css' href='/stylesheet.css'></link>;
