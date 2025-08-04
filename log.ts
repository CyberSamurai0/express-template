// Output Styling Methods
export enum ANSI {
    RESET   = "\x1b[0m",
    BLACK   = "\x1b[30m",
    RED     = "\x1b[31m",
    GREEN   = "\x1b[32m",
    YELLOW  = "\x1b[33m",
    BLUE    = "\x1b[34m",
    PURPLE  = "\x1b[35m",
    CYAN    = "\x1b[36m",
    WHITE   = "\x1b[37m",
}

const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

// If the number is one digit, force it to be two
function n(x: number) {
    if (x.toString().length === 1) return "0" + x.toString();
    else return x.toString();
}

function dateString() {
    let d : Date = new Date();
    return `${d.getFullYear()}-${MONTHS[d.getMonth()]}-${n(d.getDate())} ${n(d.getHours())}:${n(d.getMinutes())}:${n(d.getSeconds())}`
}

export function warn(msg: string) : void {console.log(`${ANSI.YELLOW}[${dateString()}] [WARN] ${msg}${ANSI.RESET}`)};
export function info(msg: string) : void {console.log(`${ANSI.BLUE}[${dateString()}] ${msg}${ANSI.RESET}`)};
export function ok(msg: string) : void {console.log(`${ANSI.GREEN}[${dateString()}] ${msg}${ANSI.RESET}`)};
export function err(msg: string) : void {console.log(`${ANSI.RED}[${dateString()}] [ERROR] ${msg}${ANSI.RESET}`)};
export function power(msg: string) : void {console.log(`${ANSI.CYAN}[${dateString()}] [SYSTEM] ${msg}${ANSI.RESET}`)};
