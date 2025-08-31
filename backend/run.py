from VisualDisp import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(port=10000, host="0.0.0.0", debug=True)
    handler=app