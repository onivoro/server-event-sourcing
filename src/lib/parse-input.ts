export const parseInput = (raw: string, delim = '::') => {
    const input = raw.split('\n')[0];
    const segments = input.split(delim);
    const cmd = segments[0];
    const args = segments.slice(1);
    const sub = args[0];
    const subArgs = args.slice(1);

    return { cmd, sub, subArgs, args };
};
