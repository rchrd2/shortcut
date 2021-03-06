#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

/**
 * Config file is a JSON file with an array of objects
 */
var configFilePath = path.join(process.env.HOME, '.shortcut.json');


/**
 * @param string name - the name
 * @param string value - the shell command to run
 */
function updateShortcut(name, value) {
  var shortcuts = readShortcuts();

  var shortcutIndex = null;
  for (var i = 0; i < shortcuts.length; i++) {
    if (shortcuts[i].name === name) {
      shortcutIndex = i;
      break;
    }
  }

  if (value === null && shortcutIndex !== null) {
    // Remove the shortcut
    shortcuts.splice(shortcutIndex, 1);
  } else if (shortcutIndex !== null) {
    // Update the shortcut
    shortcuts[shortcutIndex].value = value;
  } else {
    // Add the shortcut
    shortcuts.push({'name': name, 'value': value});
  }

  // Write to the config file
  var fileContents = JSON.stringify(shortcuts, null, 2);
  fs.writeFileSync(configFilePath, fileContents, 'utf8');
}

/**
 * @return array
 * @note might exit(1) on error
 */
function readShortcuts() {
  if (!fs.existsSync(configFilePath)) {
    return [];
  } else {
    var fileContents = fs.readFileSync(configFilePath, 'utf8');
    var shortcuts;
    try {
      shortcuts = JSON.parse(fileContents);
    } catch (e) {
      console.log('Error parsing config file. Please review the file and retry: ' + configFilePath);
      process.exit(1);
    }
    return shortcuts;
  }
}

/**
 * @param string name
 * @return object|undefined
 */
function readShortcut(name, shortcuts) {
  if (!shortcuts) shortcuts = readShortcuts();
  return shortcuts.filter(function(row) {
    return row.name == name;
  }).pop();
}

/**
 * Runs the shortcut in the cli
 * @param string name
 * @param bool run_exec - should it actually run it
 */
function runShortcut(name, run_exec) {
  var shortcut = readShortcut(name);
  if (!shortcut) {
    console.log(name + ' does not exist');
    process.exit(1);
  } else {
    if (run_exec) {
      var handle = exec(shortcut.value, function(error, stdout, stderr) {
        if (error !== null) {
          process.exit(1);
        } else {
          process.exit(0);
        }
      });
      handle.stdout.pipe(process.stdout);
      handle.stderr.pipe(process.stderr);
    } else {
      console.log(shortcut.value);
      process.exit(0);
    }
  }
}

/**
 * Lists all the shortcuts
 */
function listShortcuts(indent) {
  var shortcuts = readShortcuts()
  shortcuts.sort(function(a,b) {
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
  });
  shortcuts.forEach(function(row) {
    var space = indent ? '  ' : '';
    console.log(space + row.name + ': ' + row.value);
  });
}

function runTest() {
  console.log('Creating "test" command"');
  updateShortcut('test', 'echo hi');
  listShortcuts(true);
  runShortcut('test');
}

function showHelp() {
  console.log(`Available commands:
  add,remove,run,list,help

Example usage:
  $ shortcut add example echo Hello World!
  $ shortcut example
  echo Hello World!
  $ shortcut run example
  Hello World!

Current shortcuts:`);
  listShortcuts(true);
}

function main() {
  var action = process.argv[2];
  var args = process.argv.slice(3);
  switch (action) {
    case 'add':
      updateShortcut(args[0], args.slice(1).join(' '));
      break;
    case 'remove':
      updateShortcut(args[0], null);
      break;
    case 'list':
      listShortcuts(true);
      break;
    case '_test':
      runTest();
      break;
    case 'help':
    case '':
    case undefined:
      showHelp();
      break;
    case 'run':
      runShortcut(args[0], true);
      break;
    default:
      runShortcut(action, false);
      break;
  }
}

main();
