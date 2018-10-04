# The Nets Watch Client

The goal is to have a `settings.json` file include what's needed for a stand-alone run, or have the script connect and authenticate to a server where it's logs can be sent back to.

## What it might look like

Running stand alone would be simple.

settings.json
```
{
  "ping_targets": [
    "google.com"
  ]
}
```

and then running

```
node nets-watch-client
```

## But for the server

It would take multiple steps. We'd need to authenticate with a server, save a key, and use that for accessing the server.

```
node nets-watch-client --server=https://nets-watch.company.com
```

and from there it would ask for the credentials to be entered.