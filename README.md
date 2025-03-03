<div align="center">

<h1><a href="https://github.com/tycrek/eien" target="_blank"><img height="180" alt="eien" src="https://images.tycrek.dev/yaass" /></a></h1>

*Yet Another A ShareX Server*

</div>

## How to use

eien is simple: Install either [Deno](https://deno.com/) or [Docker Compose](https://docs.docker.com/compose/).

```bash
# Download this project
git clone https://github.com/tycrek/eien.git
cd eien/

# If you chose Deno:
deno task start

# Or you chose Docker:
docker compose up
```

For support, [visit the Discord](https://discord.gg/wGZYt5fasY).

### Configure ShareX

Add a new **Custom uploader** and configure it as shown:

| Option | Value |
| --- | --- |
| Method | POST |
| Request URL | `https://<your.domain>/upload` |
| Body | Form data (multipart/form-data) |
| File form name | file |
| URL | `{json:.url}` |

*This is subject to change as project development continues.*

#### Optional headers

| Header | Usage |
| --- | --- |
| `x-eien-sid-method` | can be `default` or `gfycat`. previously known as "access mode" in ass |

## What next?

More features are coming soon.

- Multi-user support
- Dashboards for both users & admins
- *as well as most features previously in [ass](https://github.com/tycrek/ass)*

## Contributing

Contributions are welcome! Submit any changes via PR, but please detail what you've added. Please try to match the code style of the project when submitting changes.
