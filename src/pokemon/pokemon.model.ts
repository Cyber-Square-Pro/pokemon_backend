export class Pokemon{
    constructor(
        public id:number,
        public number:string,
        public name:string,
        public imageURL:string,
        public thumbnailURL:string,
        public sprites: Object,
        public types:string[],
        public specie:string,
        public generation:string,
    ){}
}