
declare module 'musje' {
    export function parse(musjeStr: string): Score;
    export function fromJson(json: string): Score



    export class Score {
        constructor(score: object)
        parse(lexer: string): void
        addStyle(): Score
        
        play(): void;
        pause(): void;
        stop(): void;

        toString(): string;
        toJson(): string;

        render(): ScoreElement;
    }


    export class ScoreElement extends SVGElement {
        constructor(ScoreLayout: any)
    }
}