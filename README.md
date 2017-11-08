# shortcut

Create command line shortcuts.


## Install

```
npm install -g shortcut-cli
```


## Usage

```
$ shortcut add example "cd /path/to/example"
$ `shortcut example`
$ shortcut add example "cd /path/to/updated/example"
$ shortcut remove example
$ shortcut add diskspace "du -hs"
$ `shortcut diskspace`
156k
$ shortcut list
diskspace: du -hs
example: cd /path/to/updated/example
```


## Notes

As far as I can tell, it's not possible for a child process to change the working directory (eg `cd`) of the parent process. Since `cd` is one of my primary use cases, I opted to have the program print the command, which can then be executed with backticks, eg:

```
`shortcut cd-somewhere`
```

I am still considering having a way to run commands, or possibly running all commands except `cd` commands.


## License

MIT



## Credits

Richard Caceres - [@rchrd2](https://github.com/rchrd2)
