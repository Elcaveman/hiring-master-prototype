export class SafeMap<Key,Value>{
    private inner_map: Map<Key,Value> = new Map<Key,Value>();
    private default_fallback: Value;
    constructor(default_fallback:Value){
        this.default_fallback = default_fallback;
    }
    get(key:Key):Value{
        if (this.default_fallback == undefined) {
            throw new Error('No default_fallback defined');
        }
        /* Type assertion to Ignore compiler warning since we handle the undefined case manually */
        else return (this.inner_map.has(key))?this.inner_map.get(key)!:this.default_fallback;
    }
    set(key:Key,value:Value){
        this.inner_map.set(key,value);
    }
    delete(key:Key){
        return this.inner_map.delete(key)
    }
    clear(){
        this.inner_map.clear()
    }
    /* Todo impelment loop */
}