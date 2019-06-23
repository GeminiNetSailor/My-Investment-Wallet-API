FROM python:3.7.3
ENV PYTHONUNBUFFERED 1
WORKDIR /src
VOLUME /src
ADD . /src
RUN pip install -r requirements.txt
CMD ["sh", "entry.sh"]