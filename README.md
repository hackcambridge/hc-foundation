# Hack Cambridge Foundation Website

This project is the master website for the Hack Cambridge Foundation.\
This website will contain the following information about the Hack Cambridge Foundation and its annual hackathons:

- History of the foundation
- Charity Status documentation
- Foundation Agreements documents
- Trustee documents
- Past committee members
- Past hackathon volunteers
- Pictures of past hackathons
- List of past sponsors
- List of supporters
- List of logistic supporters

## Links to annual hackathons

* Hack Cambridge 2016 - First
* Hack Cambridge 2017 - Recurse
* Hack Cambridge 2018 - Ternary
* Hack Cambridge 2019 - 4D
* Hack Cambridge 2020 - 101
* Hack Cambridge 2021 - Hex
* Hack Cambridge 2022 - Atlas
* Hack Cambridge 2023 - Spyder

## Preparing a new hackathon website for hosting

1. Take a thorough look through the Dockerfiles for each hackathon in the docker folder
2. Follow a similar structure in your docker-compose file and Dockerfile
3. Host the hackathon website in a new EC2 instance (refer to steps below)
4. Add a new CNAME in Cloudflare using the template `hc-<year>-<hackathon-name>`
5. Configure your CNAME to point to your new EC2 instance's Public IPv4 DNS address
6. Access your new hackathon website at `<CNAME>.hackcambridge.com`

## Hosting a new hackathon website on AWS EC2

1. **Create an EC2 Instance:**
    1. Go to the EC2 dashboard on AWS.
    2. Launch a new instance. The Amazon Linux 2 or Ubuntu AMIs are popular choices. We recommend using Ubuntu AMIs.
    3. Choose an instance type (e.g., t2.micro if you're testing or need a free tier option).
    4. Set up your key pair for SSH access. (We recommend using the DevTeam key pair - Ask Pragash Mohanarajah for the DevTeam.pem file)
    5. Configure the security group to open ports 80 (HTTP) and any other ports you need. We recommend using the existing Hackathon Web Server security group.
    6. Launch the instance.

2. **Connect to the EC2 Instance:**
    Use the following SSH command (substitute `<your-key>.pem` and `<your-ec2-public-ip>`):
    
    ```bash
    ssh -i <your-key>.pem ec2-user@<your-ec2-public-ip>
    ```

3. **Install Docker and Docker Compose:**
    Once you're connected to the EC2 instance, install Docker:

    For Amazon Linux 2:
    ```bash
    sudo yum update -y
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    ```

    For Ubuntu:
    ```bash
    sudo apt update
    sudo apt install docker.io -y
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker $USER
    ```

    After that, log out and log back in for the group permissions to take effect.

    Then, install Docker Compose:
    ```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version
    ```

4. **Copy Your Docker Compose File to the EC2 Instance:**
    Use `scp` to copy your Docker Compose file to the EC2 instance:
    ```bash
    scp -i <your-key>.pem docker-compose.yml ec2-user@<your-ec2-public-ip>:~/
    ```

5. **Run the Docker Compose Application:**
    On your EC2 instance, navigate to where the `docker-compose.yml` file is located and run the following command to start the services:
    ```bash
    docker-compose up -d
    ```
    This will pull the images and run the services in detached mode.

## Editing the Foundation Website

This website uses a template for creating applications using Next.js 14 (pages directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-pages-template)

>Note: Since Next.js 14, the pages router is recommend migrating to the [new App Router](https://nextjs.org/docs/app) to leverage React's latest features
>
>Read more: [Pages Router](https://nextjs.org/docs/pages)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-pages-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-pages-template/blob/main/LICENSE).
