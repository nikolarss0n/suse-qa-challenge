package api_tests_test

import (
    "context"
    "time"

    "github.com/onsi/ginkgo/v2"
    "github.com/onsi/gomega"

    "github.com/nikolarss0n/suse-qa-challenge/api-tests/internal/api"
    "github.com/nikolarss0n/suse-qa-challenge/api-tests/internal/config"
    "github.com/nikolarss0n/suse-qa-challenge/api-tests/internal/logger"
)

var _ = ginkgo.Describe("Rancher API Login", func() {
    var (
        client *api.APIClient
        cfg    *config.Config
        log    = logger.GetLogger()
    )

    ginkgo.BeforeEach(func() {
        cfg = config.GetConfig()
        client = api.NewClient(cfg.BaseURL, true) // Skip TLS verification in tests
    })

    ginkgo.Context("When logging in with valid credentials", func() {
        ginkgo.It("should obtain an authentication token", func() {
            ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
            defer cancel()

            err := client.Login(ctx, cfg.Username, cfg.Password)
            gomega.Expect(err).NotTo(gomega.HaveOccurred())
            gomega.Expect(client.Token).NotTo(gomega.BeEmpty())
            log.Info("Login with valid credentials succeeded")
        })
    })

    ginkgo.Context("When logging in with invalid credentials", func() {
        ginkgo.It("should fail to authenticate", func() {
            ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
            defer cancel()

            err := client.Login(ctx, "invalid_user", "invalid_pass")
            gomega.Expect(err).To(gomega.HaveOccurred())
            gomega.Expect(client.Token).To(gomega.BeEmpty())
            log.Info("Login with invalid credentials failed as expected")
        })
    })
})
