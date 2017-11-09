# shortcut

Simple command line shortcuts.


## Install

```
npm install -g shortcut-cli
```

0 dependencies.


## Usage

Add a new shortcut
```
$ shortcut add hello echo Hello, World!
```

Run a shortcut
```
$ shortcut run hello
```

Update a shortcut
```
$ shortcut add hello echo Hello, Odyssey!
```

Remove a shortcut
```
$ shortcut remove hello
```

Add and run another shortcut
```
$ shortcut add diskspace du -hs
$ shortcut run diskspace
156k
```

List shortcuts
```
$ shortcut list
diskspace: du -hs
hello: echo Hello, Odyssey!
```


## Notes

As far as I can tell, it's not possible for a child process to change the working directory (eg `cd`) of the parent process. In order to `cd`, you have to use a command like this:

```
shortcut add cd-somewhere cd /path/to/somewhere
`shortcut cd-somewhere`
```



## License

MIT



## Credits

Richard Caceres - [@rchrd2](https://github.com/rchrd2)
