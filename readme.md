# Countdown timer

This is a Javascript-based countdown clock, that can be used for elevator-pitch type events or any other situation where a large countdown timer is desired.

## Local preview

A convenient way to have a quick and convenient local preview, is with Python:

Run `python3 -m http.server 8000` in the `timer` directory.

## Configuration

The only real configuration option is the time limit, which is set to 120 seconds by default. You can change this with the `limit` query parameter to a maximum of 3599 seconds (59 minutes and 59 seconds).

## Styling

Styling is done through Tailwind. The `timer/style.css` file is the compiled version of `src/style.css`.

The `tailwind.sh` and `tailwind-watch.sh` shell scripts can be used to compile the `timer/style.css` file via Docker, so you don't have to have Node installed on your system.

- `tailwind.sh` installs tailwind.
- `tailwind-watch.sh` watches `src/style.css` and the html files in `timer`, and compiles `timer/style.css` on any changes.