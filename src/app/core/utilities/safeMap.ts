export class SafeMap<Key,Value> extends Map<Key,Value>{
    private default_fallback: Value;
    constructor(default_fallback:Value){
        super();
        this.default_fallback = default_fallback;
    }
    override get(key:Key):Value{
        if (this.default_fallback == undefined) {
            throw new Error('No default_fallback defined');
        }
        /* Type assertion to Ignore compiler warning since we handle the undefined case manually */
        else return (super.has(key))?super.get(key)!:this.default_fallback;
    }
}