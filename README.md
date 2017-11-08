# shortcut

Simple command line shortcuts.


## Install

```
npm install -g shortcut-cli
```

0 dependencies.

## Usage

```
# Add a new shortcut
$ shortcut add example cd /path/to/example

# Run a shortcut
$ `shortcut example`

# Update a shortcut
$ shortcut add example cd /path/to/updated/example

# Remove a shortcut
$ shortcut remove example

# Add and run another shortcut
$ shortcut add diskspace du -hs
$ `shortcut diskspace`
156k

# List shortcuts
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
